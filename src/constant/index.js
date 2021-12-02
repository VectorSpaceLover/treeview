import DeleteIcon from '@material-ui/icons/Delete';
import ClassIcon from '@material-ui/icons/Class';
import EditIcon from '@material-ui/icons/Edit';
import AddBoxIcon from '@material-ui/icons/AddBox';

export const SERVER_URL = 'http://217.160.56.139/issueManager';

export const menu = [
    {
        name: 'Create',
        icon: <AddBoxIcon fontSize="small" />,
    },
    {
        name: 'Rename',
        icon: <EditIcon fontSize="small" />,
    },
    {
        name: 'Mark',
        icon: <ClassIcon fontSize="small" />,
    },
    {
        name: 'Delete',
        icon: <DeleteIcon fontSize="small" />,
    }
];

export const childMenu = [
    {
        color: 'red',
        name: 'Institutional Activities'
    },
    {
        color: 'green',
        name: 'Investments'

    },
    {
        color: 'blue',
        name: 'Reports'

    },
    {
        color: 'yellow',
        name: 'Communication'

    },
    {
        color: 'brown',
        name: 'Various and possible'
    },
    {
        color: 'orange',
        name: 'Personal Topic'
    },
    {
        color: 'purple',
        name: 'Periodic Check'
    },
    {
        color: 'black',
        name: 'Hidden'
    },
    {
        color: 'grey',
        name: 'Standard'
    },
];

