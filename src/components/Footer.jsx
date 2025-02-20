const Footer = () => {
    return (
        <footer className="footer footer-center bg-white/20 backdrop-blur-lg text-white p-5 fixed bottom-0 w-full shadow-lg">
            <div className="flex flex-col items-center gap-2">
                <p className="text-sm md:text-base font-medium">
                    © {new Date().getFullYear()} R-DevTinder - All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
