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
    icon: <AttachMoneyIcon />,
    color: "#21b860",
  },
  gift: {
    name: "Подарок",
    icon: <CardGiftcardIcon />,
    color: "#c61257",
  },
  investment: {
    name: "Инвестиции",
    icon: <AnalyticsIcon />,
    color: "#5325ae",
  },
  transferOut: {
    name: "Перевод",
    icon: <ReceiptIcon />,
    color: "#00d4fa",
  },
  transferIn: {
    name: "Приход",
    icon: <ReceiptIcon />,
    color: "#fb3435",
  },
  food: {
    name: "Еда",
    icon: <LocalDiningIcon />,
    color: "#de4916",
  },
  entertainment: {
    name: "Развлечения",
    icon: <SportsEsportsIcon />,
    color: "#f8df23",
  },
  transport: {
    name: "Транспорт",
    icon: <DirectionsBusIcon />,
    color: "#1169bf",
  },
  utilities: {
    name: "Услуги",
    icon: <CurrencyExchangeIcon />,
    color: "#0caf7a",
  },
  other: {
    name: "Прочее",
    icon: <MoreHorizIcon />,
    color: "#007257",
  },
};
