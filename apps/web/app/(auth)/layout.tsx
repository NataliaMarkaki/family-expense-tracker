import { Box } from "@mui/material";
import { PublicOnlyRoute } from "@/features/auth/RouteGuard";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PublicOnlyRoute>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          p: 2,
        }}
      >
        {children}
      </Box>
    </PublicOnlyRoute>
  );
}
