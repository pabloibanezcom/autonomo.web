import styles from './auth-layout.module.scss';

interface AuthLayoutProps {
  children: JSX.Element;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className={styles.authLayout}>
      <div className={styles.container}>
        <div className={styles.containerInner}>{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
