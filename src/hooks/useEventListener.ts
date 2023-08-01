import type React from 'react';
import type { KeyboardEvent } from 'react';
import { useEffect, useRef } from 'react';

export type MouseEventType =
  | 'click'
  | 'dblclick'
  | 'mousedown'
  | 'mouseup'
  | 'mouseover'
  | 'mousemove'
  | 'mouseout'
  | 'mouseenter'
  | 'mouseleave';
export type TouchEventType = 'touchstart' | 'touchmove' | 'touchend' | 'touchcancel';
export type KeyboardEventType = 'keydown' | 'keyup' | 'keypress';
export type FocusEventType = 'focus' | 'blur' | 'focusin' | 'focusout';
export type FormEventType = 'change' | 'input' | 'submit' | 'reset';
export type WindowEventType = 'scroll' | 'resize' | 'load' | 'unload' | 'beforeunload' | 'hashchange';

export type EventType =
  | MouseEventType
  | TouchEventType
  | KeyboardEventType
  | FocusEventType
  | FormEventType
  | WindowEventType;

export type EventTyeFn<T extends EventType, T3> = T extends MouseEventType
  ? MouseEvent
  : T extends TouchEventType
  ? TouchEvent
  : T extends KeyboardEventType
  ? KeyboardEvent<T3>
  : T extends FocusEventType
  ? FocusEvent
  : T extends FormEventType
  ? React.FormEvent<T3>
  : Event;

export type EventTypeListener<TEventType extends EventType, T3> = (event: EventTyeFn<TEventType, T3>) => void;

export function useEventListener<
  T1 extends EventType,
  T2 extends EventTypeListener<T1, T3>,
  T3 extends Element | Document | null,
>(eventType: T1, callback: T2, element?: T3) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const domElement = element ?? window;
    if (!domElement) return;
    const listener: EventListenerOrEventListenerObject = event => {
      callbackRef.current(event as Parameters<T2>[0]);
    };
    domElement.addEventListener(eventType, listener);

    return () => domElement.removeEventListener(eventType, listener);
  }, [eventType, element]);
}
