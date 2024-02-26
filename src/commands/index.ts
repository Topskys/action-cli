import createAction from './create';


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
    }
};

export default commands;