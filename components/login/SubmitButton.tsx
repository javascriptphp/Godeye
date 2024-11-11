import { Button, Form, FormInstance } from "antd";
import React, { CSSProperties } from "react";

interface SubmitButtonProps {
    form: FormInstance;
    style: CSSProperties;
}

export const SubmitButton: React.FC<
    React.PropsWithChildren<SubmitButtonProps>
> = ({ form, children, style }) => {
    const [submittable, setSubmittable] = React.useState<boolean>(false);

    // Watch all values
    const values = Form.useWatch([], form);

    React.useEffect(() => {
        form.validateFields({ validateOnly: true })
            .then(() => setSubmittable(true))
            .catch(() => setSubmittable(false));
    }, [form, values]);

    return (
        <Button
            type="primary"
            htmlType="submit"
            disabled={!submittable}
            style={style}
        >
            {children}
        </Button>
    );
};
