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
      image: '/images/projects/pollapalooza.jpg',
      link: 'https://pollapalooza.netlify.app/',
      tags: ['React', 'Node.js', 'MongoDB'],
    },
    {
      title: 'Markdown Previewer',
      description: 'Instant feedback with this real-time markdown previewer.',
      image: '/images/projects/markdown.jpg',
      link: 'https://codepen.io/jdg99/full/yXmxKL',
      tags: ['React', 'Markdown'],
    },
    {
      title: 'Simon Says',
      description: 'The classic memory game with a modern twist.',
      image: '/images/projects/simon.jpg',
      link: 'https://codepen.io/jdg99/full/BKeJvm/',
      tags: ['JavaScript', 'CSS'],
    },
    {
      title: 'Tic Tac Toe',
      description: 'A classic game of Tic Tac Toe with a modern interface.',
      image: '/images/projects/ticTacToe.jpg',
      link: 'https://codepen.io/jdg99/full/MyZgMB/',
      tags: ['JavaScript', 'CSS'],
    },
    {
      title: 'Pomodoro Clock',
      description: 'A simple yet effective tool to help you manage your time and accomplish your tasks more efficiently.',
      image: '/images/projects/pomodoro.jpg',
      link: 'https://codepen.io/jdg99/full/NNYodV/',
      tags: ['JavaScript', 'CSS'],
    },
    {
      title: 'Digital Calculator',
      description: 'Make quick work of complex calculations with this digital calculator that has all the features you need.',
      image: '/images/projects/calculator.jpg',
      link: 'https://codepen.io/jdg99/full/aNYojq/',
      tags: ['JavaScript', 'CSS'],
    },
    {
      title: 'Wikipedia Viewer',
      description: 'Find everything you need to know on Wikipedia with this fun to use and handy viewer tool.',
      image: '/images/projects/wiki.jpg',
      link: 'https://codepen.io/jdg99/full/qZNmoG/',
      tags: ['JavaScript', 'API'],
    },
    {
      title: 'Local Weather',
      description: 'Plan your day with confidence using this app that gives you the local weather forecast.',
      image: '/images/projects/weather.jpg',
      link: 'https://codepen.io/jdg99/full/oxbpJR/',
      tags: ['JavaScript', 'API'],
    },
    {
      title: 'Twitch Streamers',
      description: 'The ultimate Twitch companion that keeps you updated on when your favorite streamers are live.',
      image: '/images/projects/twitch.jpg',
      link: 'https://codepen.io/jdg99/full/mPmeLN/',
      tags: ['JavaScript', 'API'],
    },
    {
      title: 'Quote Machine',
      description: 'Expand your horizons with this app that provides a never-ending stream of thought-provoking quotes.',
      image: '/images/projects/randomQuote.jpg',
      link: 'https://codepen.io/jdg99/full/jqbOoV/',
      tags: ['JavaScript', 'API'],
    },
    {
      title: 'Tribute Project',
      description: 'Celebrate the timeless wisdom of this classic book with a tribute page that highlights its lessons.',
      image: '/images/projects/tribute.jpg',
      link: 'https://codepen.io/jdg99/full/JGVjPR/',
      tags: ['HTML', 'CSS'],
    },
    {
      title: 'File Metadata',
      description: 'Effortlessly obtain valuable information about your files using this convenient microservice.',
      image: '/images/projects/fileMetadata.jpg',
      link: 'https://github.com/JD-Gonz/fileMetadata',
      tags: ['Node.js', 'Express'],
    },
    {
      title: 'Image Search',
      description: 'Streamline your searches and deliver results quickly and effortlessly with this abstraction layer.',
      image: '/images/projects/imageSearch.jpg',
      link: 'https://github.com/JD-Gonz/imageSearch',
      tags: ['Node.js', 'API'],
    },
    {
      title: 'URL Shortener',
      description: 'Effortlessly shorten long URLs and optimize your online presence with this URL shortener.',
      image: '/images/projects/urlShortener.jpg',
      link: 'https://github.com/JD-Gonz/urlShortener',
      tags: ['Node.js', 'Express'],
    },
    {
      title: 'Request Header Parser',
      description: 'Get key browser information at a glance with this convenient header parser microservice.',
      image: '/images/projects/requestHeaderParser.jpg',
      link: 'https://github.com/JD-Gonz/headerParser',
      tags: ['Node.js', 'Express'],
    },
    {
      title: 'Timestamp Converter',
      description: 'Easily convert timestamps and natural language dates with our versatile Timestamp Microservice.',
      image: '/images/projects/Timestamp.jpg',
      link: 'https://github.com/JD-Gonz/timestampApi',
      tags: ['Node.js', 'Express'],
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