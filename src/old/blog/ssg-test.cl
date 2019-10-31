(defvar *curpath* nil)

(defun set-path (newpath) 
		(setq *curpath* newpath)
	)

(defun print-file (file)
	(let ((in (open (concatenate 'string *curpath* "/" file) )))
		(when in
			(loop for line = (read-line in nil)
				 while line do (format t "~a~%" line))
			(close in)))
	)
;opens a .blog file with parameter "name", this lets us have the number as a date
(defun open-blog (name) 
	(print-file (concatenate 'string name ".blog"))
	)
