import Image from "next/image";

import settingsIcon from "../img/settingsIcon.svg";
import Button from "@mui/material/Button";

export default function SettingsButton() {
    return (
        <div
            style={{
                marginLeft : "auto",
                marginRight: "0.5rem"
            }}
        >
            <Button
                sx={{
                    minWidth: 'auto',
                    padding: '0',
                    width: '3.6rem',
                    height: '3.6rem',
                    backgroundColor: '#6EA4BF',
                    borderRadius: '0.6rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    '&:hover': {
                        backgroundColor: '#83B7CA'
                    }
                }}>
                <Image
                    src={settingsIcon}
                    alt="Settings"
                    width={48}
                    height={48}
                />
            </Button>
        </div>
    );
}