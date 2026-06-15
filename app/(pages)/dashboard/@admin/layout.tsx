const layout = ({ children, doctor_modal }: LayoutProps<"/dashboard">) => {
  return (
    <div>
      {children}
      {doctor_modal}
    </div>
  );
};

export default layout;
