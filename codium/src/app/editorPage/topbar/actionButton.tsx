'use client';
import {Button, ButtonProps} from "@mui/material";

interface ActionButtonProps extends ButtonProps {
    highlightColor?: string;
}

export default function ActionButton({highlightColor = '#1976d2', ...props}: ActionButtonProps) {
    return (
        <div>
            <Button
                {...props}
                sx={{
                    height: '4rem',
                    pt: '1.05rem',
                    px: '1.5rem',

                    color: '#000000',
                    background: 'transparent',
                    fontSize: '1.4rem',
                    fontWeight: '600',
                    textTransform: 'capitalize',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',

                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    borderRadius: 8,

                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        backgroundColor: '#EEEEEE',
                        boxShadow: 'none',
                        color: highlightColor,
                    },
                }}
            >
                {props.children}
            </Button>
        </div>
    )
}