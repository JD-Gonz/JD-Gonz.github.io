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

  return (
    <Container maxWidth="lg" className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Avatar
            src="/public/images/mailboxPeak.jpg"
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
      </motion.div>
    </Container>
  );
};

export default About; 