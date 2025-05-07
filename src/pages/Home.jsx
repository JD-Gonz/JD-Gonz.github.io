import { motion } from 'framer-motion';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button, Avatar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  const featuredProjects = [
    {
      title: 'Pollapalooza',
      description: 'A user-friendly web app for creating, viewing, and voting on polls.',
      image: '/images/pollapalooza.jpg',
      link: 'https://pollapalooza.netlify.app/',
    },
    {
      title: 'Markdown Previewer',
      description: 'Instant feedback with this real-time markdown previewer.',
      image: '/images/markdown.jpg',
      link: 'https://codepen.io/jdg99/full/yXmxKL',
    },
    {
      title: 'Simon Says',
      description: 'The classic memory game with a modern twist.',
      image: '/images/simon.jpg',
      link: 'https://codepen.io/jdg99/full/BKeJvm/',
    },
  ];

  return (
    <Container maxWidth="lg" className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            gap: 3,
          }}
        >
          <Typography variant="h1" component="h1" gutterBottom>
            JD Gonzalez
          </Typography>
          <Typography variant="h4" component="h2" color="text.secondary" gutterBottom>
            Software Engineer
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: '600px', mb: 4 }}>
            Continuous learner, problem-solver, and leader passionate about creating innovative solutions
            that make a difference.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to="/projects"
            sx={{ mt: 2 }}
          >
            View My Work
          </Button>
        </Box>

        <Box sx={{ py: 8 }}>
          <Typography variant="h2" component="h2" gutterBottom align="center">
            Featured Projects
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {featuredProjects.map((project) => (
              <Grid item xs={12} md={4} key={project.title}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    component="a"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      textDecoration: 'none',
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={project.image}
                      alt={project.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h3">
                        {project.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {project.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              component={RouterLink}
              to="/projects"
            >
              View All Projects
            </Button>
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Home; 