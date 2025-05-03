import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import API from "../services/api";
import { useFormik } from "formik";
import * as Yup from "yup";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const fetchProfile = async () => {
    try {
      const res = await API.get("/profile/me");
      const { bio, skills, resumeLink, experience, userId } = res.data;

      setProfile({
        name: userId?.fullName || "",
        role: userId?.role || "",
        bio,
        skills: skills || [],
        resumeLink,
        experience,
      });

      formik.setValues({
        bio: bio || "",
        skills: skills ? skills.join(", ") : "",
        resumeLink: resumeLink || "",
        experience: experience || "",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Failed to fetch profile",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const formik = useFormik({
    initialValues: {
      bio: "",
      skills: "",
      resumeLink: "",
      experience: "",
    },
    validationSchema: Yup.object({
      bio: Yup.string().required("Bio is required"),
      skills: Yup.string().required("Skills are required"),
      resumeLink: Yup.string()
        .url("Invalid URL")
        .required("Resume link is required"),
      experience: Yup.string().required("Experience is required"),
    }),
    onSubmit: async (values) => {
      try {
        const payload = {
          ...values,
          skills: values.skills.split(",").map((s) => s.trim()),
        };
        await API.put("/profile", payload);
        setSnackbar({
          open: true,
          message: "Profile updated successfully!",
          severity: "success",
        });
        setOpenEdit(false);
        fetchProfile();
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Failed to update profile",
          severity: "error",
        });
      }
    },
  });

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h4" fontWeight={600}>
            Welcome, {profile?.name}
          </Typography>
          <Typography color="text.secondary">Role: {profile?.role}</Typography>

          <Divider sx={{ my: 2 }} />

          <Stack spacing={1}>
            <Typography variant="subtitle1" fontWeight={600}>
              Bio
            </Typography>
            <Typography>{profile?.bio}</Typography>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="subtitle1" fontWeight={600}>
              Skills
            </Typography>
            <Typography>{profile?.skills?.join(", ")}</Typography>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="subtitle1" fontWeight={600}>
              Resume
            </Typography>
            <Typography>
              <a
                href={profile?.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1976d2", textDecoration: "underline" }}
              >
                View Resume
              </a>
            </Typography>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="subtitle1" fontWeight={600}>
              Experience
            </Typography>
            <Typography>{profile?.experience}</Typography>
          </Stack>

          <Box mt={3}>
            <Button variant="contained" size="large" onClick={() => setOpenEdit(true)}>
              Edit Profile
            </Button>
          </Box>
        </Stack>
      </Paper>

      {/* Edit Profile Modal */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Your Profile</DialogTitle>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <DialogContent dividers>
            <Stack spacing={2}>
              <TextField
                fullWidth
                id="bio"
                name="bio"
                label="Bio"
                value={formik.values.bio}
                onChange={formik.handleChange}
                error={formik.touched.bio && Boolean(formik.errors.bio)}
                helperText={formik.touched.bio && formik.errors.bio}
              />
              <TextField
                fullWidth
                id="skills"
                name="skills"
                label="Skills (comma separated)"
                value={formik.values.skills}
                onChange={formik.handleChange}
                error={formik.touched.skills && Boolean(formik.errors.skills)}
                helperText={formik.touched.skills && formik.errors.skills}
              />
              <TextField
                fullWidth
                id="resumeLink"
                name="resumeLink"
                label="Resume Link"
                value={formik.values.resumeLink}
                onChange={formik.handleChange}
                error={formik.touched.resumeLink && Boolean(formik.errors.resumeLink)}
                helperText={formik.touched.resumeLink && formik.errors.resumeLink}
              />
              <TextField
                fullWidth
                id="experience"
                name="experience"
                label="Experience"
                value={formik.values.experience}
                onChange={formik.handleChange}
                error={formik.touched.experience && Boolean(formik.errors.experience)}
                helperText={formik.touched.experience && formik.errors.experience}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setOpenEdit(false)} color="inherit">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save Changes
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity as any}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProfilePage;
