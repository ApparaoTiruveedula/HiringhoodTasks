import Profile from "../models/Profile.js";

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id })
      .populate("userId", "fullName role"); // populate name and role

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    console.log(profile);
    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id },
      req.body,
      { new: true, upsert: true }
    ).populate("userId", "name role"); // also populate after update

    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
