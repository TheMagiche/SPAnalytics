import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import editFill from "@iconify/icons-eva/edit-fill";
import trash2Outline from "@iconify/icons-eva/trash-2-outline";
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill";
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

type ProcurementMenuProps = {
  onDelete: any;
  onOpen: any;
  procurement: any;
};

export default function ProcurementMenu({
  onDelete,
  onOpen,
  procurement,
}: ProcurementMenuProps) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    onDelete(procurement);
    setIsOpen(false);
  };

  const handleOpen = () => {
    onOpen(procurement);
    setIsOpen(false);
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleOpen} sx={{ color: "text.secondary" }}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="View"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: "text.secondary" }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} color="red" />
          </ListItemIcon>
          <ListItemText
            primary="Delete"
            primaryTypographyProps={{ variant: "body2", color: "error.main" }}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
