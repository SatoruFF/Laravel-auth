import { Input } from 'antd';
import { forwardRef, useEffect, useRef } from 'react';
import '../../scss/form-input.scss'

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <Input
            {...props}
            type={type}
            className='form-input'
            ref={input}
        />
    );
});
