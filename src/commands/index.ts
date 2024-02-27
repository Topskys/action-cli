import createAction from './create';
import listAction from './list';
import uiAction from './ui';


const commands = {
    'create <project-name>': {
        description: 'Create a new project',
        options: [
            {
                cmd: '-f, --force',
                msg: 'overwrite target directory if it exists'
            },
            {
                cmd: '--template [template-name]',
                msg: 'specify a template to use'
            }
        ],
        action: createAction,
    },
    list: {
        description: 'List available templates',
        action: listAction,
    },
    ui: {
        description: 'Open the web-based UI',
        options: [
            {
                cmd: '-p, --port [port]',
                msg: 'specify the port to run the UI on'
            },
            {
                cmd: '-h, --host [host]',
                msg: 'specify the host to run the UI on'
            }
        ],
        action: uiAction,
    },
};

export default commands;