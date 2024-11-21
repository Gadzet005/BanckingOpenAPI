import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { mochaColors } from "../style/colors";

interface CategoryInfo {
  name: string;
  icon: JSX.Element;
  color: string;
}

export const categoryInfo: Record<string, CategoryInfo> = {
  salary: {
    name: "Зарплата",
    icon: <AttachMoneyIcon color="action" />,
    color: mochaColors.green,
  },
  gift: {
    name: "Подарок",
    icon: <CardGiftcardIcon color="action" />,
    color: mochaColors.teal,
  },
  investment: {
    name: "Инвестиции",
    icon: <AnalyticsIcon color="action" />,
    color: mochaColors.mauve,
  },
  transferOut: {
    name: "Перевод",
    icon: <ReceiptIcon color="action" />,
    color: mochaColors.red,
  },
  transferIn: {
    name: "Перевод",
    icon: <ReceiptIcon color="action" />,
    color: mochaColors.blue,
  },
  food: {
    name: "Еда",
    icon: <LocalDiningIcon color="action" />,
    color: mochaColors.peach,
  },
  entertainment: {
    name: "Развлечения",
    icon: <SportsEsportsIcon color="action" />,
    color: mochaColors.maroon,
  },
  transport: {
    name: "Транспорт",
    icon: <DirectionsBusIcon color="action" />,
    color: mochaColors.lavender,
  },
  utilities: {
    name: "Услуги",
    icon: <CurrencyExchangeIcon color="action" />,
    color: mochaColors.sky,
  },
  other: {
    name: "Прочее",
    icon: <MoreHorizIcon color="action" />,
    color: mochaColors.pink,
  },
};
