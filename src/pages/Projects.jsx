import { motion } from 'framer-motion';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Chip,
  Stack,
} from '@mui/material';

const Projects = () => {
  const projects = [
    {
      title: 'Pollapalooza',
      description: 'A user-friendly web app for creating, viewing, and voting on polls.',
      image: '/images/pollapalooza.jpg',
      link: 'https://pollapalooza.netlify.app/',
      tags: ['React', 'Node.js', 'MongoDB'],
    },
    {
      title: 'Markdown Previewer',
      description: 'Instant feedback with this real-time markdown previewer.',
      image: '/images/markdown.jpg',
      link: 'https://codepen.io/jdg99/full/yXmxKL',
      tags: ['React', 'Markdown'],
    },
    {
      title: 'Simon Says',
      description: 'The classic memory game with a modern twist.',
      image: '/images/simon.jpg',
      link: 'https://codepen.io/jdg99/full/BKeJvm/',
      tags: ['JavaScript', 'CSS'],
    },
    {
      title: 'Tic Tac Toe',
      description: 'A classic game of Tic Tac Toe with a modern interface.',
      image: '/images/ticTacToe.jpg',
      link: 'https://codepen.io/jdg99/full/GRqXqX',
      tags: ['JavaScript', 'CSS'],
    },
    {
      title: 'Calculator',
      description: 'A fully functional calculator with a sleek design.',
      image: '/images/calculator.jpg',
      link: 'https://codepen.io/jdg99/full/GRqXqX',
      tags: ['JavaScript', 'CSS'],
    },
    {
      title: 'Pomodoro Timer',
      description: 'A productivity tool to help you stay focused.',
      image: '/images/pomodoro.jpg',
      link: 'https://codepen.io/jdg99/full/GRqXqX',
      tags: ['JavaScript', 'CSS'],
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
          My Projects
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 6 }}>
          A collection of projects showcasing my skills and experience in software development
        </Typography>

        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid item xs={12} md={6} key={project.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="240"
                    image={project.image}
                    alt={project.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h3">
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {project.description}
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                      {project.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{ mr: 1, mb: 1 }}
                        />
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Container>
  );
};

export default Projects; 