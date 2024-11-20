import { Box, Pagination, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { TransactionStore } from "./store/transactionStore";
import { mochaColors } from "../../public/colors";

interface TransactionListProps {
  store: TransactionStore;
}

export const TransactionListView: FC<TransactionListProps> = observer(
  ({ store }) => {
    const [page, setPage] = useState(1);

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    };

    const total = store.total;
    const totalView =
      total >= 0 ? (
        <Typography variant="h5" sx={{ color: mochaColors.green }}>
          +{total} ₽
        </Typography>
      ) : (
        <Typography variant="h5" sx={{ color: mochaColors.red }}>
          {total} ₽
        </Typography>
      );

    if (store && page > store.pages) {
      setPage(store.pages);
    }

    return (
      <Box sx={{ bgcolor: mochaColors.base, borderRadius: 4, height: "100%" }}>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              bgcolor: mochaColors.mantle,
              borderRadius: 4,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
              mb: 3,
              py: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 4,
              }}
            >
              <Typography variant="h5">Всего: {store.list.length}</Typography>
              <Box>{totalView}</Box>
            </Box>
          </Box>
          <Stack sx={{ px: 2, height: "100%" }} spacing={1}>
            {store?.getView(page)}
          </Stack>
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <Pagination
              size="large"
              onChange={handlePageChange}
              count={store?.pages}
              color="primary"
              page={page}
              boundaryCount={0}
              showFirstButton
              showLastButton
              hidePrevButton
              hideNextButton
            />
          </Box>
        </Box>
      </Box>
    );
  },
);
