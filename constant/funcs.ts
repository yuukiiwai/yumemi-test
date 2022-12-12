export const handleResErr = (res: Response) => {
    if (!res.ok) {
        throw Error(res.statusText);
    }
    return res;
};

