"use client";

import React from "react";
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { CategoryAddDialog } from "../components/categoryAddDialog.jsx";
import { CategoryUpdateDialog } from "../components/categoryUpdateDialog.jsx";
import { ItemAddDialog } from "../components/itemAddDialog.jsx";
import { CustomTableHead } from "@/components/custom-table/custom-table-head.jsx";
import TableLoadingRow from "@/components/custom-table/table-loading-row.jsx";
import TableEmptyRow from "@/components/custom-table/table-empty-row.jsx";
import PageContainer from "@/components/container/PageContainer.jsx";
import { formatCurrency } from "@/utils/format-number";

export const ProductsView = ({
  categories,
  isLoadingCategories,
  selectedCat,
  handleSelectCat,
  images,
  setImages,
  formikCreate,
  formikUpdate,
  formikAddItem,
  isOpenCatAddDialog,
  isOpenCatUpdateDialog,
  isOpenAddItemDialog,
  handleOpenCloseCatDialog,
  handleOpenCloseUpdateCatDialog,
  handleOpenCloseAddItemDialog,
  isLoadingAddCat,
  isLoadingUpdateCat,
  isLoadingAddItem,
  handleAddNewCategory,
  handleUpdateCategory,
  handleAddItem,
  items,
  isLoadingItems,
  handleClickItemRow,
  page,
  documentCount,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const itemHeaders = ["Title", "Description", "Price", "Discounted Amount"];
  return (
    <PageContainer title="Products">
      <Grid container spacing={2}>
        <Grid size={{ sm: 12, xs: 12 }}>
          <Box>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 12 }}>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6">Products Categories</Typography>
                  <Button variant="outlined" onClick={handleOpenCloseCatDialog}>
                    Add Category
                  </Button>
                </Box>
              </Grid>
              {isLoadingCategories ? (
                <Grid size={{ xs: 12, sm: 12 }}>
                  <Typography textAlign="center">Loading...</Typography>
                </Grid>
              ) : categories.length === 0 ? (
                <Grid size={{ xs: 12, sm: 12 }}>
                  <Typography textAlign="center">
                    Categories not added yet...
                  </Typography>
                </Grid>
              ) : (
                <>
                  {categories.map((item, index) => (
                    <Grid key={index} size={{ xs: 6, sm: 2 }}>
                      <Button
                        variant={
                          selectedCat && selectedCat._id === item._id
                            ? "contained"
                            : "outlined"
                        }
                        onClick={() => handleSelectCat(item._id)}
                        fullWidth
                      >
                        {item.catName}
                      </Button>
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
          </Box>
        </Grid>
        {selectedCat && (
          <Grid size={{ sm: 12, xs: 12 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 12 }}>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6" textAlign="center">
                    {`${selectedCat.catName} ( ${documentCount} items )`}
                  </Typography>
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    gap={2}
                  >
                    <Button
                      variant="outlined"
                      onClick={handleOpenCloseUpdateCatDialog}
                    >
                      Update Category
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleOpenCloseAddItemDialog}
                    >
                      Add Item
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 12 }}>
                <Card>
                  <TableContainer>
                    <Table>
                      <CustomTableHead headLabel={itemHeaders} />
                      <TableBody>
                        {isLoadingItems ? (
                          <TableLoadingRow colSpan={itemHeaders.length} />
                        ) : (
                          <>
                            {items.length > 0 ? (
                              <>
                                {items.map((item, index) => (
                                  <TableRow
                                    key={index}
                                    onClick={() => handleClickItemRow(item._id)}
                                  >
                                    <TableCell>{item.itemTitle}</TableCell>
                                    <TableCell>
                                      {item.itemDescription
                                        ? itemDescription
                                        : " - "}
                                    </TableCell>
                                    <TableCell>
                                      {formatCurrency(item.itemPrice)}
                                    </TableCell>
                                    <TableCell>{item.itemDiscount} %</TableCell>
                                  </TableRow>
                                ))}
                              </>
                            ) : (
                              <TableEmptyRow colSpan={itemHeaders.length} />
                            )}
                          </>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {items.length > 5 && (
                    <TablePagination
                      page={page}
                      component="div"
                      count={documentCount}
                      rowsPerPage={rowsPerPage}
                      onPageChange={handleChangePage}
                      rowsPerPageOptions={[10, 20, 30]}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  )}
                </Card>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
      {isOpenCatAddDialog && (
        <CategoryAddDialog
          formik={formikCreate}
          open={isOpenCatAddDialog}
          handleClose={handleOpenCloseCatDialog}
          isLoading={isLoadingAddCat}
          handleSubmit={handleAddNewCategory}
        />
      )}
      {isOpenCatUpdateDialog && (
        <CategoryUpdateDialog
          formik={formikUpdate}
          open={isOpenCatUpdateDialog}
          handleClose={handleOpenCloseUpdateCatDialog}
          isLoading={isLoadingUpdateCat}
          handleSubmit={handleUpdateCategory}
        />
      )}
      {isOpenAddItemDialog && (
        <ItemAddDialog
          isOpen={isOpenAddItemDialog}
          handleClose={handleOpenCloseAddItemDialog}
          formik={formikAddItem}
          images={images}
          setImages={setImages}
          isLoading={isLoadingAddItem}
          handleSubmit={handleAddItem}
        />
      )}
    </PageContainer>
  );
};
