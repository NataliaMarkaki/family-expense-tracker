"use client";

import {
  AppBar,
  Box,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { LogoutButton } from "@/features/auth/LogoutButton";
import { useAuth } from "@/features/auth/AuthProvider";
import { DashboardContent } from "@/features/dashboard/DashboardContent";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Family Expense Tracker
          </Typography>
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Typography
              variant="body2"
              sx={{ display: { xs: "none", sm: "block" }, opacity: 0.9 }}
            >
              {user?.email}
            </Typography>
            <LogoutButton />
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <DashboardContent />
      </Container>
    </Box>
  );
}
