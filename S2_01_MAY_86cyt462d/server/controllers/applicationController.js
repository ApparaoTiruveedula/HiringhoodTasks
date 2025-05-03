import Application from "../models/Application.js";
export const applyJob = async (req, res) => {
  const application = await Application.create({ ...req.body, applicantId: req.user.id });
  res.status(201).json(application);
};
export const getMyApplications = async (req, res) => {
  const applications = await Application.find({ applicantId: req.user.id });
  res.status(200).json(applications);
};
export const getJobApplicants = async (req, res) => {
  const applicants = await Application.find({ jobId: req.params.id });
  res.status(200).json(applicants);
};
export const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Optionally ensure only the applicant or an admin can delete
    if (application.applicantId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await application.deleteOne();
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    console.log(status)

    // Validate status value
    const validStatuses = ["pending", "shortlisted", "selected", "rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Optional: Only employers/admins should be allowed
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    application.status = status;
    await application.save();

    res.status(200).json({ message: "Application status updated", application });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
