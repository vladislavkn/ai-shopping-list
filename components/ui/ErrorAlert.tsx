import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";

export type ErrorAlertProps = {
    description: string
}

export default function ErrorAlert(props: ErrorAlertProps) {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                {props.description}
            </AlertDescription>
        </Alert>
    )
}