import Ramabackground from "./Ramabackground";
import compkeeper from "../ramaimportskeeper/compkeeper";

export const RamaaddjournalitemConst = ({ route }) => {
    const { item } = route.params || {};

    return (
        <Ramabackground
            keeper={<compkeeper.Ramaaddjournalitem item={item} />}
            heading
            text='New object'
            back
        />
    )
};


export const RamaaddplantConst = ({ route }) => {
    const { item } = route.params || {};

    return (
        <Ramabackground
            keeper={<compkeeper.Ramaaddplant item={item} />}
            heading
            text='New plant'
            back
        />
    )
};


export const RamaaddreminderConst = ({ route }) => {
    const { item } = route.params || {};

    return (
        <Ramabackground
            keeper={<compkeeper.Ramaaddreminder item={item} />}
            heading
            text='New object'
            back
        />
    )
};


export const RamacustomplantsConst = () => {
    return (
        <Ramabackground
            keeper={<compkeeper.Ramacustomplants />}
            heading
            text='My plants'
            navi
        />
    )
};


export const RamacustomremindersConst = () => {
    return (
        <Ramabackground
            keeper={<compkeeper.Ramacustomreminders />}
            heading
            text='Reminders'
            navi
        />
    )
};


export const RamagamekeeperConst = () => {
    return (
        <compkeeper.Ramagamekeeper />
    )
};


export const RamagrowthjournalConst = () => {
    return (
        <Ramabackground
            keeper={<compkeeper.Ramagrowthjournal />}
            heading
            text='Growth journal'
            navi
        />
    )
};


export const RamaloaderkeeperConst = () => {
    return (
        <Ramabackground
            keeper={<compkeeper.Ramaloaderkeeper />}
        />
    )
};


export const RamaplantinfoConst = ({ route }) => {
    const { item } = route.params;

    return (
        <Ramabackground
            keeper={<compkeeper.Ramaplantinfo item={item} />}
            heading
            text='Info'
            back
        />
    )
};


export const RamareminderinfoConst = ({ route }) => {
    const { item } = route.params;

    return (
        <Ramabackground
            keeper={<compkeeper.Ramareminderinfo item={item} />}
            heading
            text='Info'
            back
        />
    )
};


export const RamajournaliteminfoConst = ({ route }) => {
    const { item } = route.params;

    return (
        <Ramabackground
            keeper={<compkeeper.Ramajournaliteminfo item={item} />}
            heading
            text='Info'
            back
        />
    )
};


export const RamasettingskeeperConst = () => {

    return (
        <Ramabackground
            keeper={<compkeeper.Ramasettingskeeper />}
            heading
            text='Settings'
            back
        />
    )
};