import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

const CategoryDropdown = ({ CategoryservicesList }) => {
  const [open, setOpen] = useState(false);

  const [isActive, setIsActive] = useState(false);

  const handleOptionClick = (category) => {
    setOpen(false);
    setIsActive(false);
  };

  return (
    <div className="z-10 flex items-center justify-center rounded-full">
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          onClick={() => setOpen((pv) => !pv)}
          className="flex items-center gap-2 uppercase "
        >
          <span 
          >
            All Categories
          </span>
          <motion.span variants={iconVariants}>
            <FiChevronDown />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%", background: 'linear-gradient(to right, #1f541e 5%, #523a0c, #bb2a1d)' }} 
          className="flex flex-col gap-2  rounded-sm text-white border shadow-md absolute z-30 top-[120%] left-[50%] w-auto overflow-hidden"
        >
          {CategoryservicesList?.map((i, index) => (
            <Link
              className="text-white " 
              key={index}
              to={`/category/basic/services/${i._id}/${i.category_name}`}
            >
              {" "}
              <Option
                handleOptionClick={handleOptionClick}
                text={i.category_name}
              />
            </Link>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
};

const Option = ({ text, handleOptionClick }) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => handleOptionClick(text)}
      className="flex items-center w-full gap-2 px-3 py-1 text-white transition-colors border-b rounded-full cursor-pointer whitespace-nowrap hover:bg-indigo-100 hover:text-indigo-500"
    >
      <motion.span variants={actionIconVariants}></motion.span>
      <span >{text}</span>
    </motion.li>
  );
};

export default CategoryDropdown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -20,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
