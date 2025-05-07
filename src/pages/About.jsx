import { motion } from 'framer-motion';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  CardMedia,
  Link,
} from '@mui/material';
import {
  Code as CodeIcon,
  Storage as StorageIcon,
  Brush as BrushIcon,
  Group as GroupIcon,
} from '@mui/icons-material';

const About = () => {
  const skills = [
    {
      category: 'Frontend Development',
      icon: <CodeIcon />,
      items: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Material-UI'],
    },
    {
      category: 'Backend Development',
      icon: <StorageIcon />,
      items: ['Node.js', 'Express', 'Python', 'MongoDB', 'SQL', 'REST APIs'],
    },
    {
      category: 'UI/UX Design',
      icon: <BrushIcon />,
      items: ['Responsive Design', 'User Experience', 'Wireframing', 'Prototyping'],
    },
    {
      category: 'Soft Skills',
      icon: <GroupIcon />,
      items: ['Team Leadership', 'Problem Solving', 'Communication', 'Agile Methodologies'],
    },
  ];

  const personalHighlights = [
    {
      title: 'F3 Leader',
      description: 'I am one of the leaders of F3 Puget Sound, a leadership and workout group for men that focuses on fitness, fellowship, and faith. Through F3, I have been able to connect with others who share my passion for personal growth and development, and I have learned valuable lessons about leadership, teamwork, and perseverance.',
      image: '/images/f3.jpg',
      link: 'https://f3pugetsound.com/',
    },
    {
      title: 'Board Member',
      description: 'As a member of the alumni advisory board for the Information School at the University of Washington, I have the opportunity to provide feedback and support to current students, alumni, and faculty. I am committed to helping the next generation of informatics professionals achieve their goals and make an impact in their field.',
      image: '/images/iSchool.jpg',
      link: 'https://ischool.uw.edu/about/leadership/alumni-board',
    },
    {
      title: 'Blood Donor',
      description: 'I am a regular donor of both blood and platelets at Bloodworks Northwest, a nonprofit organization that provides life-saving blood components to hospitals in the Pacific Northwest. Donating blood is a small but meaningful way that I can help those in need and give back to my community.',
      image: '/images/bloodworksNW.jpg',
      link: 'https://www.bloodworksnw.org/',
    },
  ];

  return (
    <Container maxWidth="lg" className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Avatar
            src="/images/mailboxPeak.jpg"
            alt="JD Gonzalez"
            sx={{
              width: 200,
              height: 200,
              margin: '0 auto 2rem',
              border: '4px solid',
              borderColor: 'primary.main',
            }}
          />
          <Typography variant="h2" component="h1" gutterBottom>
            About Me
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
            Driven software engineer based in Seattle with a commitment to continuous learning and innovative
            problem-solving. Dedicated to collaborating with others to make a difference in the world.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {skills.map((skillGroup, index) => (
            <Grid item xs={12} md={6} key={skillGroup.category}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {skillGroup.icon}
                    <Typography variant="h5" component="h3" sx={{ ml: 1 }}>
                      {skillGroup.category}
                    </Typography>
                  </Box>
                  <List>
                    {skillGroup.items.map((skill) => (
                      <ListItem key={skill}>
                        <ListItemText primary={skill} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Experience
          </Typography>
          <Typography variant="body1" paragraph>
            I have gained valuable industry experience working on various projects, including:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Microsoft"
                secondary="Contributing to Field Service and Microsoft Cloud for Sustainability solutions"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Liberty Mutual"
                secondary="Working on a modern insurance CRM system"
              />
            </ListItem>
          </List>
        </Box>

        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Personal Highlights
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
            In addition to my work as a software engineer, I am actively involved in a variety of activities that
            reflect my values and interests. From donating blood to supporting my alma mater and participating in a
            leadership and fitness group, I am dedicated to making a positive impact in all aspects of my life.
          </Typography>
          <Grid container spacing={4}>
            {personalHighlights.map((highlight, index) => (
              <Grid item xs={12} md={4} key={highlight.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    component={Link}
                    href={highlight.link}
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
                      height="200"
                      image={highlight.image}
                      alt={highlight.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h3">
                        {highlight.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {highlight.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
};

export default About; 