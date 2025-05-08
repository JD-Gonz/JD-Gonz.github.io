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
    // TODO: Add service to send email
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
      description: 'Check out my code and projects on GitHub',
    },
    {
      icon: <LinkedInIcon />,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/jdannygonzalez/',
      description: 'Connect with me professionally on LinkedIn',
    },
    {
      icon: <EmailIcon />,
      label: 'Email',
      url: 'mailto:JD.Gonz@outlook.com',
      description: 'Send me an email at JD.Gonz@outlook.com',
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
          Feel free to connect with me through any of these platforms
        </Typography>

        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
              <Box sx={{ 
                display: 'flex', 
                gap: 2, 
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}>
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