import cron from 'node-cron';
import mongoose from 'mongoose';
import User from '../models/model.js'; // Assuming the model is imported like this

// Function to delete old activities
async function deleteOldActivities() {
  try {
    const now = new Date();

    // Find all users
    const users = await User.find();

    for (const user of users) {
      // Filter out activities older than 24 hours
      const oldActivities = user.activities.filter((activity) => {
        const activityAgeInMs =
          now.getTime() - new Date(activity.createdAt).getTime();
        return activityAgeInMs >= 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      });

      // Remove old activities using Mongoose's pull method
      oldActivities.forEach((activity) => {
        user.activities.pull({ _id: activity._id });
      });

      if (oldActivities.length > 0) {
        await user.save(); // Save the updated user document
      }
    }

    console.log('Old activities deleted successfully');
  } catch (error) {
    console.error('Error while deleting old activities:', error);
  }
}

// Set up a cron job to run the task every hour (you can adjust the timing)
cron.schedule('0 * * * *', () => {
  console.log('Running a task to delete old activities...');
  deleteOldActivities();
});
