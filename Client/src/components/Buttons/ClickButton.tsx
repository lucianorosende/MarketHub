import { FormGroup } from "../../styles";
import { Button } from "@mui/material";

export function ClickButton({
    buttonChildren,
    onClick,
    marginTop,
}: {
    buttonChildren: string;
    onClick?: () => void;
    marginTop?: number;
}) {
    return (
        <FormGroup>
            <Button
                onClick={onClick}
                variant="contained"
                style={{ marginTop: marginTop || 0 }}
            >
                {buttonChildren}
            </Button>
        </FormGroup>
    );
}
