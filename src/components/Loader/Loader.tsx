import cls from './Loader.module.scss'

export default function Loader() {

    return (
        <div className={cls.skeletonWrapper}>
            {new Array(30).fill(0).map((_, i) => (
                <div key={i} className={cls.skeleton}/>
            ))}
        </div>
    );
};