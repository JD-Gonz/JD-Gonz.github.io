import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    // For now, we'll just show a success message
    setSnackbar({
      open: true,
      message: 'Thank you for your message! I will get back to you soon.',
      severity: 'success',
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const socialLinks = [
    {
      icon: <GitHubIcon />,
      label: 'GitHub',
      url: 'https://github.com/JD-Gonz',
    },
    {
      icon: <LinkedInIcon />,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/jd-gonzalez/',
    },
    {
      icon: <EmailIcon />,
      label: 'Email',
      url: 'mailto:your.email@example.com',
    },
  ];

  return (
    <Container maxWidth="lg" className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Get in Touch
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 6 }}>
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Send Message
                </Button>
              </form>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Connect with Me
              </Typography>
              <Typography variant="body1" paragraph>
                Feel free to reach out through any of these platforms:
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                {socialLinks.map((link) => (
                  <IconButton
                    key={link.label}
                    component="a"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                    size="large"
                    sx={{
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                  >
                    {link.icon}
                  </IconButton>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </motion.div>
    </Container>
  );
};

export default Contact; 