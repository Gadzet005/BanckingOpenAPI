import { Pagination, Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { TransactionStore } from "./store/transactionStore";

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
        <p className="mocha-text-green">+{total} ₽</p>
      ) : (
        <p className="mocha-text-red">{total} ₽</p>
      );

    if (store && page > store.pages) {
      setPage(store.pages);
    }

    return (
      <div className="mocha-bg-base rounded-4 h-100">
        <div className="h-100 d-flex flex-column justify-content-between">
          <div className="mocha-bg-mantle rounded-top-4 mb-3 py-1">
            <div className="d-flex justify-content-between align-items-center px-4">
              <p className="fs-4">Всего: {store.list.length}</p>
              <div className="fs-2">{totalView}</div>
            </div>
          </div>
          <Stack className="px-2 h-100" spacing={1}>
            {store?.getView(page)}
          </Stack>
          <div className="d-flex justify-content-center my-4">
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
          </div>
        </div>
      </div>
    );
  },
);
