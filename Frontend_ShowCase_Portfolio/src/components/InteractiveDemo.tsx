import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, Grid, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

const CodeBlock = styled(Paper)(({ theme }) => ({
  backgroundColor: '#2d2d2d',
  borderRadius: 8,
  overflow: 'auto',
  fontFamily: '"Fira Code", monospace',
  fontSize: '0.9rem',
  lineHeight: 1.5,
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  maxHeight: '400px',
}));

const PreviewContainer = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
}));

interface InteractiveDemoProps {
  demoCode: string;
}

// Type for the styled button component that will be dynamically created
interface StyledButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  [key: string]: any;
}

const InteractiveDemo: React.FC<InteractiveDemoProps> = ({ demoCode }) => {
  const [selectedVariant, setSelectedVariant] = useState<'primary' | 'secondary' | 'accent'>('primary');
  
  // This will be our runtime-created button component
  const [DemoButton, setDemoButton] = useState<React.FC<StyledButtonProps> | null>(null);

  useEffect(() => {
    // Highlight the code when the component mounts
    Prism.highlightAll();
    
    // Create the actual button component at runtime
    try {
      // Define button styles
      const ButtonContainer = styled('button')(({ variant }: { variant?: string }) => ({
        padding: '10px 16px',
        borderRadius: '8px',
        fontWeight: 500,
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 
          variant === 'primary' ? '#3B82F6' : 
          variant === 'secondary' ? '#0EA5E9' : 
          variant === 'accent' ? '#8B5CF6' : '#6B7280',
        color: 'white',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        '&:active': {
          transform: 'translateY(0)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, #fff 10%, transparent 10.01%)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '50%',
          transform: 'scale(10, 10)',
          opacity: 0,
          transition: 'transform 0.3s, opacity 0.5s',
        },
        '&:active::after': {
          transform: 'scale(0, 0)',
          opacity: 0.3,
          transition: '0s',
        },
      }));

      // Create the component
      const FancyButton: React.FC<StyledButtonProps> = ({ children, variant = 'primary', ...props }) => {
        return (
          <ButtonContainer variant={variant} {...props}>
            {children}
          </ButtonContainer>
        );
      };

      setDemoButton(() => FancyButton);
    } catch (error) {
      console.error('Error creating demo component:', error);
    }
  }, []);

  const handleVariantChange = (
    event: React.MouseEvent<HTMLElement>,
    newVariant: 'primary' | 'secondary' | 'accent',
  ) => {
    if (newVariant !== null) {
      setSelectedVariant(newVariant);
    }
  };

  return (
    <Box sx={{ mt: 6, mb: 6 }}>
      <Typography 
        variant="h5" 
        component="h2" 
        gutterBottom 
        sx={{ fontWeight: 'bold', mb: 3 }}
      >
        Interactive Component Demo
      </Typography>
      <Typography variant="body1" paragraph>
        This is a custom button component with ripple effect and color variants. Try the different styles and hover/click effects.
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
            Live Preview
          </Typography>
          <PreviewContainer>
            <ToggleButtonGroup
              value={selectedVariant}
              exclusive
              onChange={handleVariantChange}
              aria-label="button variant"
              sx={{ mb: 3 }}
            >
              <ToggleButton value="primary" aria-label="primary variant">
                Primary
              </ToggleButton>
              <ToggleButton value="secondary" aria-label="secondary variant">
                Secondary
              </ToggleButton>
              <ToggleButton value="accent" aria-label="accent variant">
                Accent
              </ToggleButton>
            </ToggleButtonGroup>

            {DemoButton && (
              <DemoButton variant={selectedVariant}>
                Interactive Button
              </DemoButton>
            )}
          </PreviewContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
            Component Code
          </Typography>
          <CodeBlock>
            <pre>
              <code className="language-jsx">{demoCode}</code>
            </pre>
          </CodeBlock>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InteractiveDemo;