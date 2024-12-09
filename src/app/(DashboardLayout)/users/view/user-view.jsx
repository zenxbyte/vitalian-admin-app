"use client";

import { ConfirmationDialog } from "@/components/confirmation-dialog/confirmation-dialog";
import TableEmptyRow from "@/components/custom-table/table-empty-row";
import TableLoadingRow from "@/components/custom-table/table-loading-row";
import useAuthStore from "@/store/auth-store";
import { AddCircleRounded, DeleteForeverOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { AddAdminDialog } from "../components/add-admin-dialog";

const headers = ["Name", "Email", "Role", "Is Active", "Action"];

export const UserView = ({
  data,
  isLoading,
  isLoadingDelete,
  handleDelete,
  selectedRow,
  isOpenConfirmation,
  handleOpenCloseConfirmation,
  formik,
  isOpenAdd,
  isLoadingAdd,
  handleOpenCloseAdd,
  handleCreate,
}) => {
  const { auth } = useAuthStore();

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid size={{ sm: 6, xs: 12 }}>
          <Card elevation={9} variant={undefined}>
            <CardContent>
              <Box display="flex" flexDirection="column" gap={2}>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6">Admin Management</Typography>
                  <Button
                    variant="outlined"
                    startIcon={<AddCircleRounded />}
                    onClick={handleOpenCloseAdd}
                  >
                    New Admin
                  </Button>
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {headers.map((title, index) => (
                          <TableCell key={index}>
                            <Typography variant="subtitle2" fontWeight={600}>
                              {title}
                            </Typography>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {isLoading && (
                        <TableLoadingRow colSpan={headers.length} />
                      )}
                      {!isLoading && data.length === 0 && (
                        <TableEmptyRow colSpan={headers.length} />
                      )}
                      {!isLoading && data.length > 0 && (
                        <>
                          {data.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell>{`${row.userFirstName} ${row.userLastName}`}</TableCell>
                              <TableCell>{row.userEmail}</TableCell>
                              <TableCell>{row.userRole}</TableCell>
                              <TableCell>
                                {row.userIsActive ? "Active" : "Not Active"}
                              </TableCell>
                              <TableCell align="right">
                                {auth.user.id !== row._id && (
                                  <IconButton
                                    onClick={() =>
                                      handleOpenCloseConfirmation(row._id)
                                    }
                                    disabled={isLoadingDelete}
                                  >
                                    {isLoadingDelete &&
                                    selectedRow === row._id ? (
                                      <CircularProgress size={20} />
                                    ) : (
                                      <DeleteForeverOutlined />
                                    )}
                                  </IconButton>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {isOpenConfirmation && (
        <ConfirmationDialog
          open={isOpenConfirmation}
          handleOpenClose={handleOpenCloseConfirmation}
          handleConfirm={handleDelete}
        />
      )}
      {isOpenAdd && (
        <AddAdminDialog
          open={isOpenAdd}
          formik={formik}
          isLoading={isLoadingAdd}
          handleOpenClose={handleOpenCloseAdd}
          handleConfirm={handleCreate}
        />
      )}
    </Container>
  );
};
