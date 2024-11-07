import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

interface CategoryInfo {
  name: string;
  icon: JSX.Element;
  color: string;
}

export const categoryInfo: Record<string, CategoryInfo> = {
  salary: {
    name: "Зарплата",
    icon: <AttachMoneyIcon color="action" />,
    color: "#a6e3a1",
  },
  gift: {
    name: "Подарок",
    icon: <CardGiftcardIcon color="action" />,
    color: "#94e2d5",
  },
  investment: {
    name: "Инвестиции",
    icon: <AnalyticsIcon color="action" />,
    color: "#cba6f7",
  },
  transferOut: {
    name: "Перевод",
    icon: <ReceiptIcon color="action" />,
    color: "#f38ba8",
  },
  transferIn: {
    name: "Перевод",
    icon: <ReceiptIcon color="action" />,
    color: "#89b4fa",
  },
  food: {
    name: "Еда",
    icon: <LocalDiningIcon color="action" />,
    color: "#fab387",
  },
  entertainment: {
    name: "Развлечения",
    icon: <SportsEsportsIcon color="action" />,
    color: "#eba0ac",
  },
  transport: {
    name: "Транспорт",
    icon: <DirectionsBusIcon color="action" />,
    color: "#1169bf",
  },
  utilities: {
    name: "Услуги",
    icon: <CurrencyExchangeIcon color="action" />,
    color: "#89dceb",
  },
  other: {
    name: "Прочее",
    icon: <MoreHorizIcon color="action" />,
    color: "#f5c2e7",
  },
};
