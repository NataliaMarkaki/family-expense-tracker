import { Box, Card, CardContent, Container, Typography } from "@mui/material";

export default function DashboardPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Card>
        <CardContent>
          <Box sx={{ py: 2 }}>
            <Typography color="text.secondary">
              Template UI
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
