export default function Logo() {
  return (
    <div className="logo">
      <svg width="100" height="32" viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Letter T */}
        <text x="12" y="24" fill="var(--primary-color)" fontSize="20" fontWeight="900" fontFamily="Arial, sans-serif">T</text>

        {/* Letter I */}
        <text x="32" y="24" fill="var(--primary-color)" fontSize="20" fontWeight="900" fontFamily="Arial, sans-serif">I</text>

        {/* Letter T */}
        <text x="52" y="24" fill="var(--primary-color)" fontSize="20" fontWeight="900" fontFamily="Arial, sans-serif">T</text>
      </svg>
    </div>
  );
}