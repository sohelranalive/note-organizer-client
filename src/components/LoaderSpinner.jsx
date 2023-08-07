import { Oval } from "react-loader-spinner";

const LoaderSpinner = () => {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
            }}
        >
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Oval
                    height={100}
                    width={100}
                    color="#007E85"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="#4fa94d"
                    strokeWidth={3}
                    strokeWidthSecondary={3}
                />
            </div>
        </div>
    );
};

export default LoaderSpinner;