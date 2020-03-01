import { Field, Formik } from 'formik';
import React, { useState } from 'react';

import { ModalProps, withModal } from '../../elements/withModal';
import { FileType, getTodayDate } from '../../types';

import { Container, Error, Form, Toggle, Top } from './styles';

interface IProps extends ModalProps {
  children?: JSX.Element;
  isSubmitting?: boolean;

  closeFn?: Function;
  onAdd?: (file: FileType) => void;
}

function FileCreatorComp(_props: IProps) {
  const [isDir, setIsDir] = useState(true);

  return (
    <Container>
      <Top>
        <Toggle.Container>
          <Toggle.Option className={!isDir ? 'selected' : ''} onClick={() => setIsDir(false)}>
            File
          </Toggle.Option>
          <Toggle.Option className={isDir ? 'selected' : ''} onClick={() => setIsDir(true)}>
            Folder
          </Toggle.Option>
        </Toggle.Container>
      </Top>

      <Formik
        initialValues={{
          type: 'file',
          name: '',
          creatorName: '',
          size: 0,
          date: getTodayDate()
        }}
        validate={values => {
          const errors: Record<string, string> = {};
          if (!values.name) {
            errors.name = 'Name is Required';
          } else if (!values.creatorName) {
            errors.creatorName = 'Creator Name is Required';
          }
          return errors;
        }}
        onSubmit={values => {
          _props.onAdd({
            ...values,
            isDir
          });

          _props.closeFn();
        }}
      >
        {props => (
          <Form.Container>
            <div className="formField">
              <Field
                placeholder="Name"
                onChange={props.handleChange}
                name="name"
                className="field"
                value={props.values.name}
                autocomplete="off"
              />
              {props.errors.name && props.touched.name ? <Error>{props.errors.name}</Error> : ''}
            </div>

            <div className="formField">
              <Field
                placeholder="Creator"
                onChange={props.handleChange}
                name="creatorName"
                className="field"
                value={props.values.creatorName}
                autocomplete="off"
              />
              {props.errors.creatorName && props.touched.creatorName ? (
                <Error>{props.errors.creatorName}</Error>
              ) : (
                ''
              )}
            </div>

            <div className="formField">
              <Field
                placeholder="Size"
                type="number"
                onChange={props.handleChange}
                name="size"
                className="field"
                min="0"
                value={props.values.size}
              />
            </div>

            <div className="formField">
              <Field
                placeholder="date"
                type="date"
                onChange={props.handleChange}
                name="date"
                className="field"
                value={props.values.date}
              />
            </div>

            <Form.Submit
              type="submit"
              disabled={!props.dirty && !props.isSubmitting}
              className={!props.dirty && !props.isSubmitting ? 'disabled' : ''}
            >
              Create
            </Form.Submit>
          </Form.Container>
        )}
      </Formik>
    </Container>
  );
}

export const FileCreator = withModal<IProps>(FileCreatorComp)({});
