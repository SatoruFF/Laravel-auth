import { Button } from 'antd';

export default function PrimaryButton({classname='', children, props, disabled}) {
    return (
        <Button {...props} className={`submit-btn ${disabled}` + classname} disabled={disabled} htmlType="submit">
            {children}
        </Button>
    );
}
