const Post = require('../models/Post');
const Notification = require('../models/Notification');
const User = require('../models/User');
const { sendInterestNotification } = require('../utils/emailService');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, description, type, projectName, requiredSkills } = req.body;
    
    const post = new Post({
      title,
      description,
      type,
      projectName,
      requiredSkills,
      author: req.user._id
    });

    await post.save();
    const populatedPost = await Post.findById(post._id).populate('author', 'name email');
    res.status(201).json(populatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating post' });
  }
};

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const { type, skills, department, year } = req.query;
    let query = {};

    if (type) query.type = type;
    if (skills) query.requiredSkills = { $in: skills.split(',') };
    if (department) query['author.department'] = department;
    if (year) query['author.year'] = year;

    const posts = await Post.find(query)
      .populate('author', 'name email department year')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting posts' });
  }
};

// Get a single post
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email department year');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting post' });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const { title, description, type, projectName, requiredSkills } = req.body;
    
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    post.title = title;
    post.description = description;
    post.type = type;
    post.projectName = projectName;
    post.requiredSkills = requiredSkills;

    await post.save();
    const updatedPost = await Post.findById(post._id).populate('author', 'name email department year');
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating post' });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is the author or an admin
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    // Delete associated notifications first
    await Notification.deleteMany({ post: post._id });
    
    // Delete the post using findByIdAndDelete
    await Post.findByIdAndDelete(post._id);
    
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting post' });
  }
};

// Handle interest in a post
exports.handleInterest = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email')
      .populate('interestedUsers', 'name email');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const userId = req.user._id;
    const { interested } = req.body;

    if (interested) {
      // Add user to interestedUsers if not already there
      if (!post.interestedUsers.some(user => user._id.toString() === userId.toString())) {
        post.interestedUsers.push(userId);
        
        // Get the current user's details
        const currentUser = await User.findById(userId);
        
        // Create notification for the post author
        const notification = new Notification({
          recipient: post.author._id,
          sender: userId,
          post: post._id,
          type: 'interest',
          message: `${currentUser.name} is interested in your post "${post.title}"`
        });
        await notification.save();

        // Send email notification to the post author
        try {
          await sendInterestNotification(
            post.author.email,
            post.author.name,
            currentUser.name,
            post.title
          );
        } catch (emailError) {
          console.error('Failed to send email notification:', emailError);
          // Continue with the response even if email fails
        }
      }
    } else {
      // Remove user from interestedUsers
      post.interestedUsers = post.interestedUsers.filter(user => user._id.toString() !== userId.toString());
    }

    await post.save();
    const updatedPost = await Post.findById(post._id)
      .populate('author', 'name email')
      .populate('interestedUsers', 'name email');
    
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error handling interest' });
  }
}; 