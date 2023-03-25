import { Button } from 'antd';

export default function PrimaryButton({children, props, disabled}) {
    return (
        <Button {...props} className='submit-btn' disabled={disabled}>
            {children}
        </Button>
    );
}

// {...props}
// className={
//     ` ${
//         disabled && 'opacity-25'
//     } ` + className
// }
// disabled={disabled}
