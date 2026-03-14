'use client';
import {Button, ButtonProps } from "@mui/material";

export default function ActionButton(props: ButtonProps){
    return(
        <div>
            <Button
                variant={props.variant}
                onClick={props.onClick}
                {...props}
                sx={{
                    backgroundColor: '#6EA4BF',
                    color: 'white',
                    paddingLeft: '1.5rem',
                    paddingRight: '1.5rem',
                    paddingTop: '0.3rem',
                    paddingBottom: '0.3rem',
                    fontSize: '2rem',
                    borderRadius: '0.6rem',
                    fontFamily: 'JetBrains Mono',
                    height: '3.6rem',

                    textTransform: 'none',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    '&:hover': {backgroundColor: '#83B7CA'}
                }}
            >
                {props.children}
            </Button>
        </div>
    )
}