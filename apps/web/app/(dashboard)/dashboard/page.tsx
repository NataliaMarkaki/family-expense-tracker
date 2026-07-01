"use client";

import {
  AppBar,
  Box,
  Card,
  CardContent,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { LogoutButton } from "@/features/auth/LogoutButton";
import { useAuth } from "@/features/auth/AuthProvider";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Family Expense Tracker
          </Typography>
          <LogoutButton />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Card>
          <CardContent>
            <Box sx={{ py: 2 }}>
              <Typography color="text.secondary">
                Signed in as <strong>{user?.email}</strong>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
