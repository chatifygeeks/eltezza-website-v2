import styles from "./brands.module.scss"

interface BrandsProps {
    content: Array<BrandsPropsObj>
}

type BrandsPropsObj = {
    id: string,
    brand: string
    src: string
}

export function Brands({
    content
}: BrandsProps) {
    return (
        // TODO: fix alignment of images on start and end of each grid row
        <section id="clients" className={styles.brandsSection}>
            <h1 className={styles.brandsTitle}>OUR TRUSTED <span className="textGradient">PARTNERS</span></h1>
            <div className={styles.brandsGrid}>
                {content.map((brand) => (
                    <img
                        key={brand.id}
                        className={styles.brandLogo}
                        src={brand.src}
                        alt={brand.brand}
                    />
                ))}
            </div>
        </section>
    )
}