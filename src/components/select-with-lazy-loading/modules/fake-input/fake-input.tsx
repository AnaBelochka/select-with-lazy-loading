import cs from "classnames";
import { ArrowDownIcon } from "../../../../assets";
import styles from "./fake-input.module.scss";

type Props = {
    isOpen: boolean;
    label?: string;
    onClick: () => void;
};

export  const FakeInput = ({ isOpen, label, onClick }: Props) => {
    return (
        <div className={cs(styles.fakeInput, {[styles.open]: isOpen})} onClick={onClick}>
            <p>{label ?? "Выберите опцию"}</p>
            <ArrowDownIcon width={16} height={16}/>
        </div>
    );
}
