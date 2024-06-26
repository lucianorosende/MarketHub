import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import { modalFlag } from "../../state/slices";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PopupFlagShow } from ".";

export function PopupMaker({
    buttonText,
    redirectReference,
    redirect,
}: {
    buttonText: string;
    redirectReference: string;
    redirect: string;
}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
        dispatch(modalFlag(null));
        navigate(redirect);
    }
    function closeModalError() {
        setIsOpen(false);
        dispatch(modalFlag(null));
    }

    useEffect(() => {}, []);

    const flagSelector = useSelector(
        (state: RootState) => state.modalFlag.value
    );
    const messageSelector = useSelector(
        (state: RootState) => state.message.value
    );
    return (
        <>
            <Button variant="contained" onClick={openModal} type="submit">
                {buttonText}
            </Button>
            <PopupFlagShow
                flag={flagSelector}
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
                closeModalError={closeModalError}
                message={messageSelector}
                redirectReference={redirectReference}
            />
        </>
    );
}
